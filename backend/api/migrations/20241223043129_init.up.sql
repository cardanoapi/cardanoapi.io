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
        'Pro setup environment for writing and trying out plutus contracts and cardano transactions',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet officia assumenda ipsa magni quisquam quas, consectetur nostrum ducimus perspiciatis.'
    );