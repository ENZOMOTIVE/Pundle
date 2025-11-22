export const option_contract_address = "0x4CA32ecaa99599B86cB33D1f80624372aF8e8567" 

export const contract_abi = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Borrowed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "CollateralDeposited",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "strike",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "expiry",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "premium",
					"type": "uint256"
				}
			],
			"name": "OptionBought",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "payout",
					"type": "uint256"
				}
			],
			"name": "OptionExercised",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "borrow",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "strikePrice",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "expiry",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "premium",
					"type": "uint256"
				}
			],
			"name": "buyProtection",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "depositCollateral",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "depositLP",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAllUsers",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "getBorrowed",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "getCollateral",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "getOptionStatus",
			"outputs": [
				{
					"internalType": "bool",
					"name": "active",
					"type": "bool"
				},
				{
					"internalType": "uint256",
					"name": "strike",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "expiry",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "loans",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "collateral",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "borrowed",
					"type": "uint256"
				},
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "strikePrice",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "expiry",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "premium",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "active",
							"type": "bool"
						}
					],
					"internalType": "struct Pundle.Option",
					"name": "protection",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "lpPool",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "simulatedPrice",
					"type": "uint256"
				}
			],
			"name": "simulateDowntime",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "users",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]