import { useQuery } from "react-query";
import RegionSelect from "../components/RegionSelect";
import DepartmentSelect from "../components/DepartmentSelect";
import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <RegionSelect onChange={console.log}/>
      <DepartmentSelect onChange={console.log}/>
    </div>
  );
}
