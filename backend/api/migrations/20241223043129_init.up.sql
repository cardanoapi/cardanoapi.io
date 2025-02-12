CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
    projectname VARCHAR(255) NOT NULL UNIQUE,
    projecturl TEXT NOT NULL,
    imageurl VARCHAR(100) NOT NULL,
    subimageurl VARCHAR(255) NOT NULL,
    description VARCHAR NOT NULL, 
    about VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO projects (
    projectname,
    projecturl,
    imageurl,
    subimageurl,
    description,
    about
) VALUES 
    (
        'Split Contract',
        'https://paymentsplitter.cardanoapi.io/',
        '/images/splitContractC.jpg',
        '/images/paymentsplitter.png',
        'Explore and experience the benefits of clarity and fairness',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Mempool',
        'https://mempool.cardanoapi.io/',
        '/images/mempoolC.jpg',
        '/images/Mempool.png',
        'A complete set of tools for building decentralized applications',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Kuber IDE',
        'https://kuberide.com/',
        '/images/kuberC.jpg',
        '/images/KuberIDE.png',
        'Pro setup environment for writing and trying out Plutus contracts and Cardano transactions',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Cardano Test Wallet',
        'https://agents.cardanoapi.io/',
        '/images/cardanotestingwallet.jpg',
        '/images/cardanotestingwallet.jpg',
        'Secure and easy to use wallet for managing cryptocurrency assets.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Autonomous Agents',
        'https://agents.cardanoapi.io/',
        '/images/autonomousAgentC.jpg',
        '/images/autonomousagent.png',
        'A complete set of tools for building decentralized applications',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Ethereum',
        'https://agents.cardanoapi.io/',
        '/images/cardano.jpg',
        '/images/cardano.jpg',
        'Tools for trading online currency hassle-free',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    ),
    (
        'Blockchain Platform Suite',
        'https://agents.cardanoapi.io/',
        '/images/cardano.jpg',
        '/images/cardano.jpg',
        'A complete set of tools for building decentralized applications',
        'A complete set of tools for building decentralized applications'
    ),
    (
        'Test Wallet',
        'https://www.npmjs.com/package/@cardanoapi/cardano-test-wallet',
        '/images/kuberC.jpg',
        '/images/cardano.jpg',
        'This JavaScript library injects a simulated Cardano wallet into your web application for testing purposes after GHCR',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    );