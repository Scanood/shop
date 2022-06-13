# Yolo商城系统
基于Django + GraphQL实现的食品商城系统后端。
为食品商城系统提供API服务，在项目的shop/setting.py中设置支付宝公钥和私钥，设置邮箱服务。
可以使用sqlite和postgresql数据库，在配置文件shop/setting.py中已经进行配置，其他数据库自行配置。

## 安装
```bash
pip install -r requirements.txt
```
## 测试启动
```bash
python manage.py runserver
```