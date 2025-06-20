type DateAddressProps = {
  identifier: string;
  value: string;
};

const DateAddressComponent = (props: DateAddressProps) => {
  const { identifier, value } = props;
  return (
    <div>
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          color: "#1E293B",
        }}
      >
        {identifier}
      </div>
      <div style={{ fontWeight: "400", fontSize: "14px" }}>{value}</div>
    </div>
  );
};

export default DateAddressComponent;