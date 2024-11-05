using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace cupcake_api.Migrations
{
    /// <inheritdoc />
    public partial class SeedBaseData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DeliveryMethod",
                columns: new[] { "Id", "CreatedAt", "Enabled", "Name", "Price", "UpdatedAt" },
                values: new object[,]
                {
                    { 1L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Retirada na loja", 0.0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Entrega por motoboy", 10.0, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "PaymentMethod",
                columns: new[] { "Id", "CreatedAt", "Enabled", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Cartão de credito (online)", new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Pix", new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Cartão de credito (na entrega)", new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4L, new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Em dinheiro na entrega", new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DeliveryMethod",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "DeliveryMethod",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "Id",
                keyValue: 4L);
        }
    }
}
