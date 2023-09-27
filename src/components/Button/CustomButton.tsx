import { Button } from 'antd';
import { SizeType } from "@ant-design/pro-form/es/BaseForm";

interface Props {
  key: string;
  content: string;
  showButton: boolean;
  handleChange: () => void;
  size: SizeType;
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined;
}

const CustomButton: React.FC<Props> = (props) => {
  const { showButton, content, key, handleChange, size, type } = props;

  return (
    <>
      {{ showButton } ? (
        <Button key={key} onClick={handleChange} size={size} type={type}>
          {content}
        </Button>
      ) : null}
    </>
  );
};
export default CustomButton;
