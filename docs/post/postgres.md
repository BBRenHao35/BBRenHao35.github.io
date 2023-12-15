# Postgres SQL

::: tip 建立時間：2023/12/15
Postgres SQL 簡介
:::

## :pushpin: Postgres SQL 簡介
- 關聯式資料庫
- 支援 JSON Data

## :pushpin: 常用 Data type
- uuid: 唯一值、同GUID
- integer: 整數、同int
- numeric: 高精度數字、有小數、金融應用
- character varying: 字串、可指定長度(ex: 255)
- text: 字串、任意長度
- date: 日期、YYYY-MM-DD 
- timestamp without time zone: 日期、YYYY-MM-DD HH:MI:SS、年月日時分秒
- JSONB: Json

## :pushpin: 常用語法
- 已經有TB Table，新增Column、須注意大小寫，如果大寫要明確給雙引號
``` sql
-- 新增 Column
ALTER TABLE public."TB"
ADD COLUMN ID uuid PRIMARY KEY NOT NULL,
ADD COLUMN NAME text,
ADD COLUMN NAME2 character varying,
ADD COLUMN AGE integer,
ADD COLUMN Datetime timestamp without time zone;
```

``` sql
-- Insert Data
INSERT INTO public."TB"("id", "name", "name2", "age", "datetime")
VALUES(gen_random_uuid(), 'test', 'test2', '30', CURRENT_DATE);
```

``` sql
-- Selete Data
SELECT * FROM public."TB";

SELECT id, name2, datetime FROM public."TB"
 WHERE id = '{id}';
```

``` sql
-- Delete Data
DELETE FROM public."TB"
      WHERE "id" = '{id}';
```

``` sql
-- Update Data
UPDATE public."TB"
   SET "name2" = 'testupdate'
 WHERE "id" = '{id}';
```

![pgadmin](/public/postgres/pgadmin.png)