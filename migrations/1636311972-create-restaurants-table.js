exports.up = async function up(sql) {
  await sql`
    CREATE TABLE restaurants (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      restaurantname varchar(40) UNIQUE NOT NULL,
      addressplace varchar(100) NOT NULL,
      descriptionplace varchar(500),
      photo varchar(500),
			rating varchar(100) NOT NULL,
			price varchar(10),
			website varchar(60),
			openinghours varchar(200),
			coordinates varchar(100)
    )
  `;
};
// Drop table with ley down
exports.down = async function down(sql) {
  await sql`
    DROP TABLE restaurants
  `;
};
