import { useEffect, useState } from "react";
import { Table } from "@/components/retroui/Table";
import { Badge } from "@/components/retroui/Badge";
import { ethers } from "ethers";


import { option_contract_address, contract_abi } from "../../Dashboard/solidity_utils";

interface UserData {
  address: string;
  collateral: string;
  borrowed: string;
  optionActive: boolean;
}

export default function PundleUserTable() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) return;

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(option_contract_address, contract_abi, provider);

      const collateral = await contract.getCollateral(address);
      const borrowed = await contract.getBorrowed(address);
      const optionActive = await contract.getOptionStatus(address);

     setUserData({
  address,
  collateral: ethers.formatEther(collateral),       // ETH
  borrowed: ethers.formatUnits(borrowed, 6),       // USDC with 6 decimals
  optionActive,
});

    };

    fetchUserData();
  }, []);

  if (!userData) return <p>Loading user data...</p>;

  return (
    <Table className="max-w-lg mb-6">
      <Table.Header className="bg-yellow-400">
        <Table.Row>
          <Table.Head>Address</Table.Head>
          <Table.Head>Collateral (ETH)</Table.Head>
          <Table.Head>Borrowed</Table.Head>
          <Table.Head>Option Active</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row key={userData.address}>
          <Table.Cell className="font-medium">{userData.address}</Table.Cell>
          <Table.Cell>{userData.collateral}</Table.Cell>
          <Table.Cell>{userData.borrowed}</Table.Cell>
          <Table.Cell>
            <Badge variant={userData.optionActive ? "solid" : "outline"} size="sm">
              {userData.optionActive ? "Active" : "Inactive"}
            </Badge>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
