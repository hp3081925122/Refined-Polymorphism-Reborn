# Refined Polymorphism Reborn

90 的 Refined Polymorphism 的非官方 1.21.1 NeoForge 工程。协议是 LGPL-3.0-only，全文在 `LICENSE`，署名和修改记录在 `NOTICE.md`。

源码：https://github.com/hp3081925122/Refined-Polymorphism-Reborn

```powershell
$env:JAVA_HOME = 'C:\Users\30819\.jdks\ms-21.0.11'
.\gradlew.bat compileJava
```

`libs/` 里的两个 jar 不进仓库，需要自己放进去：

- `polymorph-neoforge-1.2.0+1.21.1.jar`（必须是 NeoForge 版，同版本号的默认包是 Forge）
- `jei-1.21.1-neoforge-19.70.0.469.jar`（Polymorph 1.2.0 要求 JEI 19.52 或更高）

Refined Storage 由 Modrinth Maven 拉取。功能迁移范围见上一级 `docs/迁移说明.md`。
