using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cupcake_api.Migrations
{
    /// <inheritdoc />
    public partial class ExtendedPaymentAndDeliveryInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "RequireCardInfo",
                table: "PaymentMethod",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequireAddress",
                table: "DeliveryMethod",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "DeliveryMethod",
                keyColumn: "Id",
                keyValue: 1L,
                column: "RequireAddress",
                value: false);

            migrationBuilder.UpdateData(
                table: "DeliveryMethod",
                keyColumn: "Id",
                keyValue: 2L,
                column: "RequireAddress",
                value: true);

            migrationBuilder.UpdateData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 1L,
                column: "RequireCardInfo",
                value: true);

            migrationBuilder.UpdateData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 2L,
                column: "RequireCardInfo",
                value: false);

            migrationBuilder.UpdateData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 3L,
                column: "RequireCardInfo",
                value: false);

            migrationBuilder.UpdateData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 4L,
                column: "RequireCardInfo",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequireCardInfo",
                table: "PaymentMethod");

            migrationBuilder.DropColumn(
                name: "RequireAddress",
                table: "DeliveryMethod");
        }
    }
}
