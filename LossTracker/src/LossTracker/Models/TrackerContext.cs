using System;
using Microsoft.Data.Entity;

namespace LossTracker.Models
{
    public class TrackerContext : DbContext
    {
        public TrackerContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<DiaryEntry> DiaryEntries { get; set; }
        public DbSet<Measurement> Measurements { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:TrackerContextConnection"];

            optionsBuilder.UseSqlServer(connectionString);

            base.OnConfiguring(optionsBuilder);
        }
    }
}