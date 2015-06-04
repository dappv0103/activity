# activity
newsfeed, notification

```
command.find('add_feed').run({
  created_by: 1,
  position: {
    name: "group",
    id: 1
  }
}, function(result) {
  console.log('result');
});
```
