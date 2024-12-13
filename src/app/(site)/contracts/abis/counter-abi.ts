export const test1Abi= [
  {
    "type": "impl",
    "name": "CounterContract",
    "interface_name": "counter::counter::ICounter"
  },
  {
    "type": "interface",
    "name": "counter::counter::ICounter",
    "items": [
      {
        "type": "function",
        "name": "increase_counter",
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
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "intial_value",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "event",
    "name": "counter::counter::MyCounter::Event",
    "kind": "enum",
    "variants": []
  }
] as const;