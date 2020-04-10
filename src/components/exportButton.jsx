import { Row, Col, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

export default props => (
  <Button
    type="primary"
    size="small"
    icon={<ExportOutlined rotate={-90} />}
    {...props}
  >
    {props.children}
  </Button>
);
