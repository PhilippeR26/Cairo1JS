export const test1Abi= [
  {
    "type": "function",
    "name": "test1",
    "inputs": [
      {
        "name": "p1",
        "type": "core::felt252"
      }
    ],
    "outputs": [
      {
        "type": "core::felt252"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "test2",
    "inputs": [
      {
        "name": "p1",
        "type": "core::integer::u128"
      }
    ],
    "outputs": [
      {
        "type": "core::integer::u128"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "test3",
    "inputs": [],
    "outputs": [
      {
        "type": "core::integer::u128"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "increase_balance",
    "inputs": [
      {
        "name": "amount",
        "type": "core::felt252"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "get_balance",
    "inputs": [],
    "outputs": [
      {
        "type": "core::felt252"
      }
    ],
    "state_mutability": "view"
  }
]