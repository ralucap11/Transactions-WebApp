using Microsoft.EntityFrameworkCore;
using TransactionApp.Data;

var builder = WebApplication.CreateBuilder(args);
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); //for the date
//EF Core and PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));


//CORS
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();



var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("AllowReactApp"); //activates cors
app.UseAuthorization();
app.MapControllers(); // .NET to recognise the controller
app.Run();