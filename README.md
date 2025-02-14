# 第三方平台DEMO（含后台）-服务器版本

### 步骤一. 准备工作

打开work/key.json。按照描述如是填写第三方平台的配置信息

需要提前规划此项目部署的域名地址，并保证在微信开放平台配置完毕。另外授权消息监听路径为/call，在开放平台设置时需要注意配置正确

小程序模板ID需要按照相关教程上传完毕，获取模板id数字，并填写。

### 步骤二. 检查附件

在work/deployfunction，有test.zip文件，此为云函数示例的压缩文件。请按照自己的业务需求更换此文件，或者直接改写

### 步骤三. 适配和开发调试

可执行如下命令进行运行调试，但是你无法启动，因为没有微信平台给予的ticket，你可以先部署，获取发给的ticket，这在work/database/db_wxid.json中可以查看。

```
npm run dev
```

## 步骤四. 上线

你可以使用服务器或者体验cloudbase云应用等多种形式部署此项目，部署完毕后请再次确认你的url是否与配置的相一致。

另外请确定你的服务器ip地址，并保证ip地址在平台的白名单中

## 项目声明

此项目DEMO完全参照云开发云函数进行改写，整体逻辑没有变化，你可以在work中按目录看到每一个云函数的逻辑。项目采用LowDB来代替云开发数据库，具体在work/database目录中。

## 相关教程

## 修改的问题
- req.body 为空

##