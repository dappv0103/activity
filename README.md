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
# Xóa tin
```
command.find('delete_feed').run({object: {
  id: 10,
  name: "status"
}}, function(result) {
  console.log('result');
});
```

# Hoạt động
```
command.find('activity').run({
  
  // Người hoạt động
  actor: 10,
  
  // Hành động
  verb: 'like',
  
  // Đối tượng hoạt động
  object: {
    id: 10,
    name: "status"
  },
  
  // xếp hạng hoạt động
  ranking: 0.1,
  
}, function(result) {
  console.log('result');
});
```

# Xóa Hoạt động
```
command.find('delete_activity').run({
  
  // Người hoạt động
  actor: 10,
  
  // Hành động
  verb: 'like',
  
  // Đối tượng hoạt động
  object: {
    id: 10,
    name: "status"
  },
}, function(result) {
  console.log('result');
});
```

# Lấy danh sách bảng tin
```
command.find('newsfeed').run({
  
  // Người lấy
  to_id: 10,
  
  // Vị trí hiển thị
  position: {
    name: "group",
    id: 1
  },
  
  // Page info
  page: {
    limit: 10,
    total: 10,
    current: 1
  }
  
}, function(result) {
  console.log('result');
});
```

# Lấy danh sách thông báo
```
command.find('notification').run({
  
  // Người lấy
  to_id: 10,
  
  // Page info
  page: {
    limit: 10,
    total: 10,
    current: 1
  }
  
}, function(result) {
  console.log('result');
});
```
