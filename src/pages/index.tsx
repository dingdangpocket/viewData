import styles from './index.less';
import { Menu, Button, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Link } from 'umi';

export default function IndexPage(props:any) {
  const onClick = ({ key }: any) => {
    console.log(key);
  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
        { label: '菜单项二', key: 'item-2' },
        {
          label: '子菜单',
          key: 'submenu',
          children: [{ label: '子菜单项', key: 'submenu-item-1' }],
        },
      ]}
    />
  );
  return (
    <div>
      <Link to={'/home'}>home</Link>
      <img src="../asstes/paid.png" alt="" />
 
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
