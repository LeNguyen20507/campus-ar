# Poster Assets

## How to Add Your Poster

### 1. Take a Photo of Your Poster
- Use good lighting (avoid shadows and glare)
- Take the photo straight-on (not at an angle)
- Make sure the poster fills most of the frame
- Keep the background simple

### 2. Prepare the Image
- Crop the image to just the poster content
- Save as PNG or JPG
- Recommended size: 1024x1024 to 2048x2048 pixels
- Keep file size under 5MB

### 3. Add to Project
- Save your poster image as: `melioraPoster.png` in this folder
- Update `ar/posterTargets.ts` with the correct `physicalWidth` in meters
  - Measure your printed poster width
  - Convert to meters (e.g., 24 inches = 0.61 meters)

### 4. Test
- Print the poster (or display on another screen)
- Run the app and point camera at it
- The 3D model should appear locked to the poster

## Tips for Best Tracking

✅ **DO:**
- Use high-contrast images with distinct features
- Ensure good lighting when scanning
- Keep the poster flat (not wrinkled or folded)
- Hold camera steady when first detecting

❌ **DON'T:**
- Use all-white or all-black posters
- Use blurry or low-resolution images
- Scan in very dim lighting
- Use glossy posters with strong reflections

## Poster Size Recommendations

| Poster Size | Width (inches) | Width (meters) | Recommended |
|-------------|----------------|----------------|-------------|
| Small       | 11" × 17"      | 0.28m          | ⚠️ May be hard to track |
| Medium      | 18" × 24"      | 0.46m          | ✅ Good |
| Large       | 24" × 36"      | 0.61m          | ✅ Best |
| Extra Large | 36" × 48"      | 0.91m          | ✅ Excellent |

## Example Poster

For testing, you can use a simple poster with:
- University logo centered
- "Roc Spirit" text
- High-contrast colors
- Clear boundaries

Save it here as `melioraPoster.png` and update the `physicalWidth` value!
