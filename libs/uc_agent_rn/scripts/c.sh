#!/bin/bash

# Kiểm tra nếu không có tham số đầu vào
if [ -z "$1" ]; then
  echo "❌ Vui lòng cung cấp đường dẫn đến thư mục cần xử lý."
  echo "👉 Cách dùng: ./convert-js-to-jsx.sh /duong/dan/thu-muc"
  exit 1
fi

TARGET_DIR="$1"

# Kiểm tra xem thư mục có tồn tại không
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Thư mục '$TARGET_DIR' không tồn tại."
  exit 1
fi

echo "🔄 Đang đổi đuôi .js thành .jsx trong thư mục: $TARGET_DIR"

# Tìm tất cả các file .js trong thư mục đó (đệ quy)
find "$TARGET_DIR" -type f -name "*.js" | while read file; do
  newfile="${file%.js}.jsx"
  mv "$file" "$newfile"
  echo "✅ Đã đổi tên: $file → $newfile"
done

echo "✅ Hoàn tất."
