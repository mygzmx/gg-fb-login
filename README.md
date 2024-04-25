# 三方登陆注销

#### 本地开发环境访问目标页面
```
例如：
// http://localhost:3000/dramabox.html
```

#### 开发规范
```
公共文件避免修改，例如src/styles/globals.scss、src/utils/getAndroidIos.ts等、页面单独所需资源尽量限制在页面views下的当前文件夹内；
因为涉及cdn缓存，如果修改公共文件，请查看各个页面引用的资源变化情况，上线前务必运维清除cdn缓存。
```


#### 环境
```
## Jenkins
http://192.168.0.60:1808/jenkins/job/DEV-hwyc-other/
## 测试
http://192.168.0.55/other/
```
### 多页面配置react & typescript
```
  1.config/paths.js添加module
  2.entry入口添加自定义文件
  3.output修改bundle.js 改为 [name].bundle.js
  4.plugins补充new HtmlWebpackPlugin();
  注： 生成html文件依赖src/views下的文件夹， 且对应文件夹下必须要有index(.js|.jsx|.tsx|.ts)
```

### env环境配置 .env文件
```
GENERATE_SOURCEMAP = "false" // 关闭sourcemap
BUILD_PATH = "build" // 构建文件
```
### 文件
```
├── config
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
└── srcipts
    ├── build.js
    └── start.js
├── src
    ├── views // 生成多html文件，且对应文件夹下必须要有index(.js|.jsx|.tsx|.ts)
    ├── index.tsx // 主入口文件
    ├── react-app-env.d.ts
    ├── setupProxy.js // 代理
    └── react-app-env.d.ts
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
