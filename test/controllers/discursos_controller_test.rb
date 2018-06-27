require 'test_helper'

class DiscursosControllerTest < ActionController::TestCase
  setup do
    @discurso = discursos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:discursos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create discurso" do
    assert_difference('Discurso.count') do
      post :create, discurso: { data: @discurso.data, descricao: @discurso.descricao, duracao: @discurso.duracao }
    end

    assert_redirected_to discurso_path(assigns(:discurso))
  end

  test "should show discurso" do
    get :show, id: @discurso
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @discurso
    assert_response :success
  end

  test "should update discurso" do
    patch :update, id: @discurso, discurso: { data: @discurso.data, descricao: @discurso.descricao, duracao: @discurso.duracao }
    assert_redirected_to discurso_path(assigns(:discurso))
  end

  test "should destroy discurso" do
    assert_difference('Discurso.count', -1) do
      delete :destroy, id: @discurso
    end

    assert_redirected_to discursos_path
  end
end
