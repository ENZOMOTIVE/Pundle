import { useEffect, useState } from "react";
import { Table } from "@/components/retroui/Table";
import { Badge } from "@/components/retroui/Badge";
import { ethers } from "ethers";

import { option_contract_address, contract_abi } from "../../../contract-abi/lending-borrowing";

interface UserData {
  address: string;
  collateral: string;
  borrowed: string;
  optionActive: boolean;
}

export default function PundleUserTable() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) return;

      const provider = new ethers.BrowserProvider(ethereum);
      const contract = new ethers.Contract(option_contract_address, contract_abi, provider);

      try {
        // Fetch all users from the contract
        const users: string[] = await contract.getAllUsers();

        const userDataList: UserData[] = await Promise.all(
          users.map(async (user) => {
            const collateral = await contract.getCollateral(user);
            const borrowed = await contract.getBorrowed(user);
            const [active] = await contract.getOptionStatus(user);

            return {
              address: user,
              collateral: ethers.formatEther(collateral), // ETH
              borrowed: ethers.formatUnits(borrowed, 6),  // USDC with 6 decimals
              optionActive: active,
            };
          })
        );

        setUserData(userDataList);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (!userData.length) return <p>No loans found.</p>;

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
        {userData.map((user) => (
          <Table.Row key={user.address}>
            <Table.Cell className="font-medium">{user.address}</Table.Cell>
            <Table.Cell>{user.collateral}</Table.Cell>
            <Table.Cell>{user.borrowed}</Table.Cell>
            <Table.Cell>
              <Badge variant={user.optionActive ? "solid" : "outline"} size="sm">
                {user.optionActive ? "Active" : "Inactive"}
              </Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
