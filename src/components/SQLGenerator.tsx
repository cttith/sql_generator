import styles from "./SQLGenerator.module.css";

type SQLGeneratorProps = {
  sql: string;
};

const SQLGenerator = (props: SQLGeneratorProps) => {
  const { sql } = props;
  return <div className={styles.sqlContainer}>{sql}</div>;
};

export default SQLGenerator;
