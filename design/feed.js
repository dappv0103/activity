


/**
 * Tổng hợp tất cả các đối tượng liên quan vào 1 bảng duy nhất (bảng feed)
 * PHP:
 *	Feed::add({
 *		position:1,
 *		created_by: 	1,
 *		object:		"album:2",
 *		meta: {
 *			content: "Ảnh kỷ niệm chuyến đi chơi tam đảo",
 *			photos: [
 *					{id: 1, path:"/media/photo1.jpg"}
 *					{id: 1, path:"/media/photo2.jpg"}
 *			]
 *		}
 *	});
 */
 
 
(Feed) 
----------------------------------
_id			|created_by	    |position	    | object	|	meta		|	ranking		|	created_at  |	updated_at	| privacy
-------------------------------------------------------------------------------------------------------------------------------------
1			|user:1			|g:1			| album:1	|	{c: 'a'}	|	0.1			|	1405504545	|	1405504545	|	"publish"
2			|user:2			|u:1			| album:2	|	{c: 'a'}	|	0.1			|	1405504545	|	1405504545	|	"private"
3			|user:3			|p:1			| photo:1   |   {c: 'a'}	|	0.2			|	1405504545	|	1405504545  |	"publish"



// Bài viết hiển thị trên trang chủ mỗi người
(Feed Home)
------------
to_id		|feed_id			|ranking			|created_at		|updated_at
-------------------------------------------------------------------------------
user:1		|3					|0.2				|1405504545		|1405504545




// Bài viết hiển thị trong trang cá nhân
(Feed User Page)
------------
to_id		|   feed_id			|   created_at		|   updated_at		|privacy
--------------------------------------------------------------------------
user:3		|   3					|   1405504545		|   1405504545		|"publish"



// Bài viết tương ứng trong từng group
(Feed Group)
-----------
group_id	  | feed_id		|ranking			|   created_at	|   updated_at
------------------------------------------------------------------------------
group:1       | 1			|0.3				|   1405504545	|   1405504545
group:1       | 2			|0.2				|   1405504545	|   1405504545
group:1       | 3			|0.1				|   1405504545	|   1405504545



// Hoạt động được gửi đến mỗi người
(Feed Activity)
-----------
to_id			|actor			|verb		|feed_id		|created_time
-------------------------------------------------------------------------
user:1 			|2				|"like"		|3				|1405504545



//
(Notification)
-----------
to_id			|   actors		|   verb			|   feed_id		    |created_time
-------------------------------------------------------------------------------------
user:1 			|   [1, 2]		|   "like"		    |   3				|1405504545


// Danh sách đăng ký nhận thông báo đến đối tượng
(Alert map)
--------------------
user_id			| object	
-----------------------------
1               | g:1


// Danh sách đối tượng follow
(Follow map)
------------
user_id			| object	 
-----------------------------
1               | g:1 



