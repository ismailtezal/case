import AddUser from "@/components/AddUser";
import Navbar from "@/components/Navbar";
import Result from "@/components/Result";


export default function Home() {

  return (
    <>
      <Navbar title="Navbar" />
      <Result/>
      <AddUser/>
    </>
  );
}
