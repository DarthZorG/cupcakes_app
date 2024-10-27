using cupcacke_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;
using System;
using cupcacke_api.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

namespace cupcacke_api
{
    public class Program
    {
        protected static void setupServices(
            IServiceCollection services,
            ConfigurationManager configuration
        )
        {
            String? connectionString = configuration["DBConnectionString"]; // "Server=192.168.25.223; Port=3306; database=TuttoInBolla; uid=newuser; pwd=dev";
            if (String.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration["Database:ConnectionString"];
            }

            ServerVersion serverVersion = ServerVersion.AutoDetect(connectionString);
            /*    services.Configure<MailSettings>(configuration.GetSection("MailSettings"));
                services.AddTransient<Email.IMailService, Email.MailService>(); */

            services.AddDbContext<Database.DataContext>(
                (options) =>
                {
                    options.UseMySql(connectionString, serverVersion);
                }
            );

            services
                .AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<Database.DataContext>()
                .AddDefaultTokenProviders();

            var httpContextAccessor = new HttpContextAccessor();
            services.AddSingleton<IHttpContextAccessor>(httpContextAccessor);

            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    // options.JsonSerializerOptions.Converters.Add(new Converters.UserConverter());
                    options.JsonSerializerOptions.Converters.Add(
                        new Converters.PublicFileConverter(httpContextAccessor)
                    );
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(
                    options =>
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = false,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(configuration["JWT:key"])
                            ),
                            ClockSkew = TimeSpan.Zero
                        }
                );
            services.AddAuthorization(options =>
            {
                AccessPolicies.RegisterPolicies(options);
            });
            services.AddHttpContextAccessor();

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                };
            });
            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: "_allowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    }
                );
            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(
                    "v1",
                    new OpenApiInfo
                    {
                        Version = typeof(Program).Assembly.GetName().Version.ToString(),
                        Title = "CupCake APP API",
                        Description = "Cupcake APP API",
                        TermsOfService = new Uri("https://www.cupcake-app.com.br/terms"),
                    }
                );

                options.SchemaFilter<Swagger.SwaggerIgnoreFilter>();
                options.AddSecurityDefinition(
                    "oauth2",
                    new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Flows = new OpenApiOAuthFlows
                        {
                            Password = new OpenApiOAuthFlow
                            {
                                TokenUrl = new Uri("/identity/authorize", UriKind.Relative),
                            },
                        },
                        Scheme = "tomsAuth"
                    }
                );
                options.AddSecurityRequirement(
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "oauth2"
                                }
                            },
                            new string[] { }
                        }
                    }
                );
                var filePath = Path.Combine(System.AppContext.BaseDirectory, "cupcacke-api.xml");
                options.IncludeXmlComments(filePath);
            });
        }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.




            setupServices(builder.Services, builder.Configuration);

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
