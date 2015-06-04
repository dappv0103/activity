# activity
newsfeed, notification

# Tạo tin mới
```
command.find('add_feed').run({
  // người tạo tin
  created_by: 1,
  
  // Vị trí hiển thị
  position: {
    name: "group",
    id: 1
  },
  
  // Thông tin đối tượng
  object: {
    name: 'status',
    id: 10
  }
  
  // thông tin liên quan
  meta: {
    id: 10
    content: "Ngày làm việc bình thường",
    comments: [{id:10, content: "bình thường"}]
    tags: [{id:1, name: "Long"}, {id:2, name: "Thắng"}]
  },
  
  // xếp hạng bài viết
  ranking: 0.4
  
}, function(result) {
  console.log('result');
});
```
