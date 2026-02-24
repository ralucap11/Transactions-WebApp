using Microsoft.EntityFrameworkCore;
using TransactionApp.Data;
using TransactionApp.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddAuthorization();
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

builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("AllowReactApp"); //activates cors
app.UseAuthorization();
app.MapControllers(); // .NET to recognise the controller
app.Run();