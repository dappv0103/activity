

#Notification

```

- To
- Verb
- Feed_id
- Foreign_id
- Of
- Meta
- Actors
- Is_read
- Created_at

```

#Activity

```
Command.find('activity').run({
  actor_id: 10,
  verb: "created",
});
```
