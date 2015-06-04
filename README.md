# activity
newsfeed, notification

```
command.find('add_feed').run({
  // người tạo tin
  created_by: 1,
  
  // Vị trí hiển thị
  position: {
    name: "group",
    id: 1
  },
  
  // thông tin liên quan
  meta: {
    id: 10
    content: "Đi chơi ngày qua",
    tags: [{id:1, name: "Long"}, {id:2, name: "Thắng"}]
  },
  
  // xếp hạng bài viết
  ranking: 0.4
  
}, function(result) {
  console.log('result');
});
```
