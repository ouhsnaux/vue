# table-tricks

1. table + page + form 组合
1. table 多选可翻页

## table + page + form

* 表单内容变化时，重置 pageNum 和 pageSize，发送请求
* pageNum 变化时，发送请求
* pageSize 变化时，重置 pageNum，发送请求

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
