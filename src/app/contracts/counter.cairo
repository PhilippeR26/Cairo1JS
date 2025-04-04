// Cairo 2.4.0

#[starknet::interface]
trait ICounter<TContractState> {
    fn increase_counter(ref self: TContractState, amount: felt252);
    fn get_balance(self: @TContractState) -> felt252;
}


#[starknet::contract]
mod MyCounter {
    #[storage]
    struct Storage {
        balance: felt252
    }
    #[constructor]
    fn constructor(ref self: ContractState, intial_value: felt252) {
        self.balance.write(intial_value);
    }

    // increase the balance
    #[external(v0)]
    impl CounterContract of super::ICounter<ContractState> {
        fn increase_counter(ref self: ContractState, amount: felt252) {
            self.balance.write(self.balance.read() + amount);
        }


        // Returns the current balance.
        fn get_balance(self: @ContractState) -> felt252 {
            self.balance.read()
        }
    }
}

