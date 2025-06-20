interface HeadingProps {
  heading: string;
  color: string;
}

const Heading = ({ heading, color }: HeadingProps) => {
  const isMainHeading = ["Conclusion", "Executive Summary", "Key Takeaway"].includes(heading);
  const className = `text-[16px] font-[600] font-[Inter] text-[${color}] ${!isMainHeading ? 'ml-[18px]' : ''}`;
  
  return <div className={className}>{heading}</div>;
};

export default Heading;
