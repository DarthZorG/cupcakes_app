using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cupcake_api.Migrations
{
    /// <inheritdoc />
    public partial class AddPicturesToProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ImageId",
                table: "Product",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Product_ImageId",
                table: "Product",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_UploadedFiles_ImageId",
                table: "Product",
                column: "ImageId",
                principalTable: "UploadedFiles",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_UploadedFiles_ImageId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_ImageId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Product");
        }
    }
}
