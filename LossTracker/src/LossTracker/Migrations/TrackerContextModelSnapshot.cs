using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using LossTracker.Models;

namespace LossTracker.Migrations
{
    [DbContext(typeof(TrackerContext))]
    partial class TrackerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LossTracker.Models.DiaryEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Day");

                    b.Property<int?>("FoodId");

                    b.Property<int>("NumberOfServings");

                    b.Property<int?>("ProfileId");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("LossTracker.Models.Food", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Calories");

                    b.Property<int>("CarbGrams");

                    b.Property<string>("Description");

                    b.Property<int>("FatGrams");

                    b.Property<int>("ProteinGrams");

                    b.Property<int>("ServingSizeInGrams");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("LossTracker.Models.Measurement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<int?>("ProfileId");

                    b.Property<int>("WaistInches");

                    b.Property<int>("WeightLbs");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("LossTracker.Models.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CalorieGoal");

                    b.Property<int>("CarbGoal");

                    b.Property<int>("FatGoal");

                    b.Property<int>("ProteinGoal");

                    b.Property<string>("UserName");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("LossTracker.Models.DiaryEntry", b =>
                {
                    b.HasOne("LossTracker.Models.Food")
                        .WithMany()
                        .HasForeignKey("FoodId");

                    b.HasOne("LossTracker.Models.Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId");
                });

            modelBuilder.Entity("LossTracker.Models.Measurement", b =>
                {
                    b.HasOne("LossTracker.Models.Profile")
                        .WithMany()
                        .HasForeignKey("ProfileId");
                });
        }
    }
}
