import { Tabs, TabsPanels, TabsTrigger, TabsContent, TabsTriggerList } from "@/components/retroui/Tab";



export default function TabStyleDefault() {
  return (
    <Tabs>
      <TabsTriggerList>
        <TabsTrigger>Test-1</TabsTrigger>
        <TabsTrigger>Test-2</TabsTrigger>
      </TabsTriggerList>

      <TabsPanels>
        <TabsContent>
          This is the details page for Test-1
        </TabsContent>
        <TabsContent>
          This is the details page for Test-2

        </TabsContent>
      </TabsPanels>
    </Tabs>
  );
}
