<?php

namespace Database\Factories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Todo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, 3),
            'task' => $this->faker->paragraph(1),
            'datetime' => $this->faker->dateTimeBetween('-30 days', '+ 30 days', 'Asia/Taipei'),
            'completed' => rand(0, 1),
        ];
    }
}
