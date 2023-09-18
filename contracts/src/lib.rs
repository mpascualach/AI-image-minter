use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet};
use near_sdk::{env, near_bindgen, Promise, AccountId};


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ChatHistory {
    ipfs_hash: String,
    signer: AccountId,
    signature: Vec<u8>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct PoP {
    token_ids: UnorderedSet<u32>,
    histories: UnorderedMap<u32, ChatHistory>,
}
#[near_bindgen]
impl PoP {
    #[init]
    pub fn new() -> Self {
        Self {
            token_ids: UnorderedSet::new(/*prefix*/),
            histories: UnorderedMap::new,
        }
    }

    #[payable]
    pub fn mint(&mut self, to: AccountId, ipfs_hash: String, signature: Vec<u8>) {
        let deposit = env::attached_deposit();
        let mint_cost = 10_000_000_000_000_000_000; // 0.01 NEAR in yoctoNEAR
        
        assert!(deposit >= mint_cost, "Insufficient NEAR to mint token");

        let id = self.token_ids;
        self.token_ids += 1;

        let new_history = ChatHistory {
            ipfs_hash,
            signer: to.clone(),
            signature,
        };

        self.histories.insert(&id, &new_history);

        // Mint the token (implement your own token standard or use an existing one)
        // Example: self.mint_token(to, id);

        // Transfer any excess funds back to the sender
        let excess = deposit - mint_cost;
        if excess > 0 {
            Promise::new(to.clone()).transfer(excess);
        }
    }

    pub fn token_uri(&self, token_id: u64) -> Option<String> {
        match self.histories.get(&token_id) {
            Some(history) => Some(history.ipfs_hash.clone()),
            None => None,
        }
    }

    pub fn token_signature(&self, token_id: u64) -> Option<Vec<u8>> {
        match self.histories.get(&token_id) {
            Some(history) => Some(history.signature.clone()),
            None => None,
        }
    }

    #[only_owner]
    pub fn withdraw_funds(&self) {
        let contract_balance = env::balance();
        Promise::new(env::predecessor_account_id()).transfer(contract_balance);
    }
}

