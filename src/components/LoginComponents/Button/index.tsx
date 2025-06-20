import { Button } from 'antd';


const StyledButton = (props:any) => <Button {...props} style={{height:'44px', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'24px', paddingRight:'24px'}}>{props.children}</Button>;



export default StyledButton;
