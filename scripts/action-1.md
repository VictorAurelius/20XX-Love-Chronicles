hãy đọc scripts/idea-1.md để hiểu về ý tưởng dự án tôi muốn làm
hãy tạo ra scripts/req-1.md là plan task cho claude để tạo ra project này
sau đó tôi sẽ review lại req-1 để đưa ra plan task hoàn chỉnh
lưu ý: req-1 cần hướng dẫn tôi phân cấp folder vào đặt tên file trong data/ => các file hình ảnh/ video cần hiển thị

## CÂU HỎI CẦN XÁC NHẬN TRƯỚC KHI BẮT ĐẦU

1. Couple có bao nhiêu events hiện tại? (để estimate workload)
2. Có bao nhiêu ảnh/video ước tính? (để plan storage)
đang ước tính có các events sau:
1. trước khi tỏ tình => khoảng 10 ảnh
2. hôm tỏ tình => 5 ảnh
3. các kỉ niệm khác (đến trước 30/09 - sinh nhật bạn trai) => 20 ảnh
4. sinh nhật bạn trai => 7 ảnh
5. sinh nhật bạn gái => trang chính => 5 ảnh

3. Muốn host ở đâu? (Vercel free tier OK không?)
tôi muốn deploy trên github luôn. nhưng vẫn có build docker

4. Có muốn tính năng upload ảnh qua UI hay OK với manual copy files?
manual copy files => mỗi khi deploy lại

5. Có muốn password protect site không?
tôi muốn mọi người đều có thể xem, còn việc thêm file vào data sẽ tự gen ra events

6. Có sẵn design mockup hay để Claude tự thiết kế?
Claude hãy tự thiết kế, sao cho aniamtion thật mượt

7. Color scheme/theme preference? (pastel, romantic, minimal, dark?)
đương nhiên là romantic

hãy sửa lại plan task

tôi muốn thêm 1 events trươc sinh nhật bạn trai: event đi du lịch Ninh Bình 10 ảnh, 2 video, ngoài ra tất cả các events khác mỗi events cũng sẽ có 2 video
đặc biệt, video sẽ là dạng dọc nên cần display tốt

hãy sửa lại req-1 cho phù hợp
ngoài ra, có phải tôi cần bổ sung data trước khi bạn tạo code đúng không?

tôi muốn hỏi là số lượng ảnh và video phải khớp hoàn toàn với mỗi events không?
hãy tạo sẵn các folder cho các event hiện tại trong data

tôi vừa sửa lại tên các folder timeline, hãy sửa lại các file liên quan
hãy đề cử các nguồn backgrounds và bài hát hợp lý cho context này

tôi có nhiều file music vào thì bạn có thể tạo random music + random vòng phát nhạc mỗi khi vào web không? và web tĩnh có phát nhạc được không?

nhưng tôi muốn vào 2 event birthday thì chỉ phát nhạc birthday

tôi muốn trong folder music có 1 folder con cho nhạc birthday và đối với events birthday sẽ dùng riêng nhạc trong thư mục này (đương nhiên sẽ có nhiều file nhạc trong thư mục)

hãy sửa Kỉ Niệm Trước Sinh Nhật thành kỉ niệm đời thường và xử lý đặc biệt cho event này, vì sẽ có nhiều ảnh và video hơn hẳn các event khác. Giao diện cho video cũng phải xử lý tốt để xem mượt mà

bắt đầu thực hiện req-1 nào

sửa lại summary và readme sang tiếng việt