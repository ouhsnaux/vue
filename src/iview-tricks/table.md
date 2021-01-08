# table-tricks

1. `table` + `page` + `form` 组合
1. `table` 多选可翻页
1. `table` 多选，且单元格有输入框

## table + page + form

* 表单内容变化时，重置 `pageNum` 和 `pageSize`，发送请求
* `pageNum` 变化时，发送请求
* `pageSize` 变化时，发送请求
* 由于 `pageSize` 变化极有可能触发 `on-change` 事件，导致发送**2**次请求，
需要使用防抖

## table 多选可翻页

* 将选中内容单独存储到 `chosenList`。
* 监听 `on-selection-change` 事件，从 `chosenList` 中删除当前列表的数据，然后加入当前选中项。

```vue
// template
<Table @on-selection-change="onSelectionChange" >

// script
onSelectionChange(list) {
  // 找出当前表格的数据项
  const tableIdsMap = {};
  this.tableData.forEach(item => {
    tableIdsMap[item.id] = true;
  });

  // 删除表格中的数据
  this.chosenList = this.chosenList.filter(
    item => !tableIdsMap[item.id],
  );

  // 增加选中项
  this.chosenList = this.chosenList.concat(list);
},
```

## `table` 多选，且单元格有输入框

通常情况下，输入框的值我们会从 `tableData` 中取，并对输入框进行双向绑定。
但是当输入框数据变化时，`table` 组件会刷新，选中行的状态会被初始化。
下面有两种解决方案。

1. `data` 中增加一个属性记录输入框的值 `inputMap`，渲染时根据 `inputMap` 及索引取值。（推荐）
1. 另一种方法是，手动控制选中项，维护 `tableData` 中每一项的 `_checked` 值。

如果有校验，需要对未选中项取消校验，在 `key` 字段中根据选中状态区分。
