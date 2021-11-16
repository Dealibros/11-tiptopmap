exports.up = async function up(sql) {
  await sql`
    CREATE TABLE users_restaurants_ratings   (
			user_id integer REFERENCES users(id) ON DELETE CASCADE,
			restaurant_id integer REFERENCES restaurants(id) ON DELETE CASCADE,
			rating_id integer REFERENCES ratings(id) ON DELETE CASCADE,
			PRIMARY KEY (user_id, restaurant_id, rating_id)
		)
  `;
};
// Drop table with ley down
exports.down = async function down(sql) {
  await sql`
    DROP TABLE users_restaurants_ratings
  `;
};
