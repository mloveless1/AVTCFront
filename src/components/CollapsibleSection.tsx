import Collapsible from "react-collapsible";
import { adjustedCollapsibleStyle } from "../styles/signup";
import { BsChevronDown } from "react-icons/bs";

const CollapsibleSection: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => (
    <Collapsible trigger={<div style={adjustedCollapsibleStyle}>{title} <BsChevronDown /></div>}>
      {content}
    </Collapsible>
  );

export default CollapsibleSection