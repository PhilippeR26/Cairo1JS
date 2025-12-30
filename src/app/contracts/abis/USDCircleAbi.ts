export const USDCircleAbi= [
  {
    "type": "impl",
    "name": "FiatTokenImpl",
    "interface_name": "stablecoin::fiat_token::interface::IFiatToken"
  },
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "stablecoin::fiat_token::interface::IFiatToken",
    "items": [
      {
        "type": "function",
        "name": "version",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "total_supply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "allowance",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "mint",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "burn",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "spender",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "BlocklistableImpl",
    "interface_name": "components::blocklistable::interface::IBlocklistable"
  },
  {
    "type": "interface",
    "name": "components::blocklistable::interface::IBlocklistable",
    "items": [
      {
        "type": "function",
        "name": "blocklister",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "update_blocklister",
        "inputs": [
          {
            "name": "new_blocklister",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "blocklist",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "unblocklist",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "is_blocklisted",
        "inputs": [
          {
            "name": "address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "MinterManagementImpl",
    "interface_name": "stablecoin::minter_management::interface::IMinterManagement"
  },
  {
    "type": "interface",
    "name": "stablecoin::minter_management::interface::IMinterManagement",
    "items": [
      {
        "type": "function",
        "name": "configure_controller",
        "inputs": [
          {
            "name": "controller",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "minter",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "remove_controller",
        "inputs": [
          {
            "name": "controller",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_master_minter",
        "inputs": [
          {
            "name": "new_master_minter",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_minter",
        "inputs": [
          {
            "name": "controller",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "is_minter",
        "inputs": [
          {
            "name": "minter",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "minter_allowance",
        "inputs": [
          {
            "name": "minter",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "master_minter",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "configure_minter",
        "inputs": [
          {
            "name": "minter_allowance",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "remove_minter",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "increment_minter_allowance",
        "inputs": [
          {
            "name": "increment",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ManageableImpl",
    "interface_name": "components::manageable::interface::IManageable"
  },
  {
    "type": "interface",
    "name": "components::manageable::interface::IManageable",
    "items": [
      {
        "type": "function",
        "name": "admin",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "pending_admin",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_admin",
        "inputs": [
          {
            "name": "new_admin",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "accept_admin",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "MetadataImpl",
    "interface_name": "stablecoin::metadata::interface::IMetadata"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "interface",
    "name": "stablecoin::metadata::interface::IMetadata",
    "items": [
      {
        "type": "function",
        "name": "metadata_updater",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "update_metadata_updater",
        "inputs": [
          {
            "name": "new_metadata_updater",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "update_metadata",
        "inputs": [
          {
            "name": "name",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "symbol",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "OwnableImpl",
    "interface_name": "components::ownable::interface::IOwnable"
  },
  {
    "type": "interface",
    "name": "components::ownable::interface::IOwnable",
    "items": [
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "pending_owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "accept_ownership",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "PausableImpl",
    "interface_name": "components::pausable::interface::IPausable"
  },
  {
    "type": "interface",
    "name": "components::pausable::interface::IPausable",
    "items": [
      {
        "type": "function",
        "name": "pauser",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "update_pauser",
        "inputs": [
          {
            "name": "new_pauser",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "pause",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "unpause",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "UpgradeableImpl",
    "interface_name": "components::upgradeable::interface::IUpgradeable"
  },
  {
    "type": "interface",
    "name": "components::upgradeable::interface::IUpgradeable",
    "items": [
      {
        "type": "function",
        "name": "upgrade",
        "inputs": [
          {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "name",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "symbol",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "decimals",
        "type": "core::integer::u8"
      },
      {
        "name": "master_minter",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "pauser",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "blocklister",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "metadata_updater",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "admin",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::blocklistable::events::BlocklisterChanged",
    "kind": "struct",
    "members": [
      {
        "name": "old_blocklister",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_blocklister",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::blocklistable::events::Blocklisted",
    "kind": "struct",
    "members": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::blocklistable::events::Unblocklisted",
    "kind": "struct",
    "members": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::blocklistable::blocklistable::BlocklistableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "BlocklisterChanged",
        "type": "components::blocklistable::events::BlocklisterChanged",
        "kind": "nested"
      },
      {
        "name": "Blocklisted",
        "type": "components::blocklistable::events::Blocklisted",
        "kind": "nested"
      },
      {
        "name": "Unblocklisted",
        "type": "components::blocklistable::events::Unblocklisted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::ControllerConfigured",
    "kind": "struct",
    "members": [
      {
        "name": "controller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::ControllerRemoved",
    "kind": "struct",
    "members": [
      {
        "name": "controller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::MasterMinterChanged",
    "kind": "struct",
    "members": [
      {
        "name": "old_master_minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_master_minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::MinterConfigured",
    "kind": "struct",
    "members": [
      {
        "name": "controller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "allowance",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::MinterRemoved",
    "kind": "struct",
    "members": [
      {
        "name": "controller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::events::MinterAllowanceIncremented",
    "kind": "struct",
    "members": [
      {
        "name": "controller",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "allowance_increment",
        "type": "core::integer::u256",
        "kind": "data"
      },
      {
        "name": "new_allowance",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::minter_management::minter_management::MinterManagementComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ControllerConfigured",
        "type": "stablecoin::minter_management::events::ControllerConfigured",
        "kind": "nested"
      },
      {
        "name": "ControllerRemoved",
        "type": "stablecoin::minter_management::events::ControllerRemoved",
        "kind": "nested"
      },
      {
        "name": "MasterMinterChanged",
        "type": "stablecoin::minter_management::events::MasterMinterChanged",
        "kind": "nested"
      },
      {
        "name": "MinterConfigured",
        "type": "stablecoin::minter_management::events::MinterConfigured",
        "kind": "nested"
      },
      {
        "name": "MinterRemoved",
        "type": "stablecoin::minter_management::events::MinterRemoved",
        "kind": "nested"
      },
      {
        "name": "MinterAllowanceIncremented",
        "type": "stablecoin::minter_management::events::MinterAllowanceIncremented",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::manageable::events::AdminChanged",
    "kind": "struct",
    "members": [
      {
        "name": "old_admin",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_admin",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::manageable::events::AdminChangeStarted",
    "kind": "struct",
    "members": [
      {
        "name": "old_admin",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_admin",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::manageable::manageable::ManageableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "AdminChanged",
        "type": "components::manageable::events::AdminChanged",
        "kind": "nested"
      },
      {
        "name": "AdminChangeStarted",
        "type": "components::manageable::events::AdminChangeStarted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::metadata::events::MetadataUpdated",
    "kind": "struct",
    "members": [
      {
        "name": "name",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      },
      {
        "name": "symbol",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      },
      {
        "name": "decimals",
        "type": "core::integer::u8",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::metadata::events::MetadataUpgraderUpdated",
    "kind": "struct",
    "members": [
      {
        "name": "old_metadata_updater",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_metadata_updater",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::metadata::metadata::MetadataComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "MetadataUpdated",
        "type": "stablecoin::metadata::events::MetadataUpdated",
        "kind": "nested"
      },
      {
        "name": "MetadataUpgraderUpdated",
        "type": "stablecoin::metadata::events::MetadataUpgraderUpdated",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::ownable::events::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "old_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::ownable::events::OwnershipTransferStarted",
    "kind": "struct",
    "members": [
      {
        "name": "old_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::ownable::ownable::OwnableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "components::ownable::events::OwnershipTransferred",
        "kind": "nested"
      },
      {
        "name": "OwnershipTransferStarted",
        "type": "components::ownable::events::OwnershipTransferStarted",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::pausable::events::Paused",
    "kind": "struct",
    "members": []
  },
  {
    "type": "event",
    "name": "components::pausable::events::Unpaused",
    "kind": "struct",
    "members": []
  },
  {
    "type": "event",
    "name": "components::pausable::events::PauserChanged",
    "kind": "struct",
    "members": [
      {
        "name": "old_pauser",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "new_pauser",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::pausable::pausable::PausableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Paused",
        "type": "components::pausable::events::Paused",
        "kind": "nested"
      },
      {
        "name": "Unpaused",
        "type": "components::pausable::events::Unpaused",
        "kind": "nested"
      },
      {
        "name": "PauserChanged",
        "type": "components::pausable::events::PauserChanged",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::upgradeable::events::ContractUpgraded",
    "kind": "struct",
    "members": [
      {
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "components::upgradeable::upgradeable::UpgradeableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ContractUpgraded",
        "type": "components::upgradeable::events::ContractUpgraded",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::events::FiatTokenInitialized",
    "kind": "struct",
    "members": [
      {
        "name": "initialized_version",
        "type": "core::integer::u8",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::events::Mint",
    "kind": "struct",
    "members": [
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "amount",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::events::Burn",
    "kind": "struct",
    "members": [
      {
        "name": "burner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "amount",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::events::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::events::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "spender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "value",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "stablecoin::fiat_token::fiat_token::FiatToken::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "BlocklistableEvent",
        "type": "components::blocklistable::blocklistable::BlocklistableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "MinterManagementEvent",
        "type": "stablecoin::minter_management::minter_management::MinterManagementComponent::Event",
        "kind": "flat"
      },
      {
        "name": "ManageableEvent",
        "type": "components::manageable::manageable::ManageableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "MetadataEvent",
        "type": "stablecoin::metadata::metadata::MetadataComponent::Event",
        "kind": "flat"
      },
      {
        "name": "OwnableEvent",
        "type": "components::ownable::ownable::OwnableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "PausableEvent",
        "type": "components::pausable::pausable::PausableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "UpgradeableEvent",
        "type": "components::upgradeable::upgradeable::UpgradeableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "FiatTokenInitialized",
        "type": "stablecoin::fiat_token::events::FiatTokenInitialized",
        "kind": "nested"
      },
      {
        "name": "Mint",
        "type": "stablecoin::fiat_token::events::Mint",
        "kind": "nested"
      },
      {
        "name": "Burn",
        "type": "stablecoin::fiat_token::events::Burn",
        "kind": "nested"
      },
      {
        "name": "Transfer",
        "type": "stablecoin::fiat_token::events::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "stablecoin::fiat_token::events::Approval",
        "kind": "nested"
      }
    ]
  }
]