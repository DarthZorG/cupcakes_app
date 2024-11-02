using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cupcake_api.Migrations
{
    /// <inheritdoc />
    public partial class UserFavoriteProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Timezone",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "ProductUser",
                columns: table => new
                {
                    FavoritedById = table.Column<string>(type: "varchar(100)", nullable: false, collation: "utf8mb4_general_ci"),
                    FavoritesId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUser", x => new { x.FavoritedById, x.FavoritesId });
                    table.ForeignKey(
                        name: "FK_ProductUser_Product_FavoritesId",
                        column: x => x.FavoritesId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductUser_Users_FavoritedById",
                        column: x => x.FavoritedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUser_FavoritesId",
                table: "ProductUser",
                column: "FavoritesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductUser");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Users",
                type: "varchar(30)",
                maxLength: 30,
                nullable: true,
                collation: "utf8mb4_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "Timezone",
                table: "Users",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                collation: "utf8mb4_general_ci");
        }
    }
}
