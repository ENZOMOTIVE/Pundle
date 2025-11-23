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
        const users: string[] = await contract.getAllUsers();

        const userDataList: UserData[] = await Promise.all(
          users.map(async (user) => {
            const collateral = await contract.getCollateral(user);
            const borrowed = await contract.getBorrowed(user);
            const [active] = await contract.getOptionStatus(user);

            return {
              address: user,
              collateral: ethers.formatEther(collateral),
              borrowed: ethers.formatUnits(borrowed, 6),
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

  if (loading)
    return (
      <p className="text-center text-gray-700 text-lg mt-8 animate-pulse">
        Loading user data...
      </p>
    );

  if (!userData.length)
    return (
      <p className="text-center text-gray-600 text-lg mt-8">
        No loans found.
      </p>
    );

  return (
    <div className="flex justify-center w-full">
      <div className="
        w-full max-w-4xl 
        bg-white/40 backdrop-blur-xl 
        shadow-2xl rounded-3xl 
        p-8 border border-white/30 
        animate-fadeIn
      ">
        
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">
          Active Borrowers Overview
        </h2>

        <Table className="rounded-xl overflow-hidden shadow-lg">
          <Table.Header className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-lg">
            <Table.Row>
              <Table.Head className="py-4 px-3">Sl. No.</Table.Head>
              <Table.Head className="py-4 px-3">Address</Table.Head>
              <Table.Head className="py-4 px-3">Collateral (ETH)</Table.Head>
              <Table.Head className="py-4 px-3">Borrowed</Table.Head>
              <Table.Head className="py-4 px-3">Option Active</Table.Head>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {userData.map((user, index) => (
              <Table.Row
                key={user.address}
                className="hover:bg-yellow-50/70 transition-all duration-200"
              >
                <Table.Cell className="py-4 px-3 font-semibold text-gray-800">
                  {index + 1}
                </Table.Cell>

                <Table.Cell className="py-4 px-3 font-medium text-gray-900">
                  {user.address}
                </Table.Cell>

                <Table.Cell className="py-4 px-3 text-gray-700">
                  {user.collateral}
                </Table.Cell>

                <Table.Cell className="py-4 px-3 text-gray-700">
                  {user.borrowed}
                </Table.Cell>

                <Table.Cell className="py-4 px-3">
                  <Badge
                    variant={user.optionActive ? "solid" : "outline"}
                    size="sm"
                    className={`px-3 py-1 rounded-full shadow ${
                      user.optionActive
                        ? "bg-green-500 text-white"
                        : "border-gray-500 text-gray-700"
                    }`}
                  >
                    {user.optionActive ? "Active" : "Inactive"}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
