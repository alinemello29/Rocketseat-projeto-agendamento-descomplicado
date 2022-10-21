![Screenshot 2022-10-21 12 24 32](https://user-images.githubusercontent.com/109696840/197232309-c8a3e165-7b75-470d-8cc1-dc24942e9f26.png)


# Front-end

- React Query
- Zod
- React Hook Form

# Back-end

## Register

- Create user (username, name)
  - User can be already taken
    - If not fully registered, keep going with registration
    - Otherwise, return an error
- Connect google calendar
  - When registered with Google, save user avatar the profile
- Add time intervals
  - User should not be able to submit this without any valid dates/times
- Update profile (avatar, bio)

## Schedule

- Fetch available dates from user (per month)
- Fetch available times from user (per date)
- Create schedule (user, name, e-mail, observations, attach to google calendar)
