using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace LossTracker.Models
{
    public class LossTrackerUser : IdentityUser
    {
        public DateTime FirstDiaryEntry { get; set; }
    }
}